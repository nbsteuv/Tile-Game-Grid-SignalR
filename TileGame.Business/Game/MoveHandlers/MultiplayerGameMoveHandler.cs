using System.Linq;
using TileGame.Business.Game.HubContext;
using TileGame.Business.Models;

namespace TileGame.Business.Game.MoveHandlers
{
    public class MultiplayerGameMoveHandler : IMoveHandler
    {
        private readonly Connection _connection;
        private readonly User _user;
        private readonly IGameHubContext _gameHubContext;
        private readonly IGameData _gameData;

        public MultiplayerGameMoveHandler(Connection connection, User user, IGameHubContext gameHubContext, IGameData gameData)
        {
            _connection = connection;
            _user = user;
            _gameHubContext = gameHubContext;
            _gameData = gameData;
        }

        public void HandleMove(Move move)
        {
            _user.MoveHistory.Add(move.MovedTileIndex);

            var incomingMove = new IncomingMove
            {
                MoveHistory = _user.MoveHistory,
                Username = _user.Username
            };

            var users = _connection.Players.Concat(_connection.Watchers);

            foreach(var user in users)
            {
                if(user.ConnectionId != _user.ConnectionId)
                {
                    _gameHubContext.SendPlayerMove(user.ConnectionId, incomingMove);
                }
            }

            if (IsWinningMove())
            {
                _gameHubContext.SendWinConfirmedNotification(_user.ConnectionId);

                foreach (var user in _connection.Players)
                {
                    if(user.ConnectionId != _user.ConnectionId)
                    {
                        _gameHubContext.SendPlayerWinNotification(user.ConnectionId, _user.Username);
                    }
                }

                _gameData.EndGame(_connection);
            }
        }

        private bool IsWinningMove()
        {
            //TODO: Put this in a puzzle service method or a method on a puzzle object
            for(var i = 0; i < _connection.Key.Length; i++)
            {
                if (_user.Puzzle[i] != _connection.Key[i])
                {
                    return false;
                }
            }

            return true;
        }
    }
}

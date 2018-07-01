using TileGame.Business.Game.HubContext;
using TileGame.Business.Models;

namespace TileGame.Business.Game.MoveHandlers
{
    public class MultiplayerGameMoveHandler : IMoveHandler
    {
        private readonly Connection _connection;
        private readonly User _user;
        private readonly IGameHubContext _gameHubContext;

        public MultiplayerGameMoveHandler(Connection connection, User user, IGameHubContext gameHubContext)
        {
            _connection = connection;
            _user = user;
            _gameHubContext = gameHubContext;
        }

        public void HandleMove(Move move)
        {
            _user.MoveHistory.Add(move.MovedTileIndex);

            foreach(var user in _connection.Players)
            {
                if(user.ConnectionId != _user.ConnectionId)
                {
                    _gameHubContext.SendPlayerMove(user.ConnectionId, _user.MoveHistory);
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

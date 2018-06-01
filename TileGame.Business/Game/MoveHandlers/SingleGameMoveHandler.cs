using TileGame.Business.Game.HubContext;
using TileGame.Business.Models;

namespace TileGame.Business.Game.MoveHandlers
{
    public class SingleGameMoveHandler : IMoveHandler
    {
        private readonly Connection _connection;
        private readonly User _user;
        private readonly IGameHubContext _gameHubContext;

        public SingleGameMoveHandler(Connection connection, User user, IGameHubContext gameHubContext)
        {
            _connection = connection;
            _user = user;
            _gameHubContext = gameHubContext;
        }

        public void HandleMove(Move move)
        {
            if (IsWinningMove())
            {
                _gameHubContext.SendWinNotification(_user);
            }
        }

        private bool IsWinningMove()
        {
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

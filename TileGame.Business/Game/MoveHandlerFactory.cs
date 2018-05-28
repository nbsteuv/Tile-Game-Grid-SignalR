using TileGame.Business.Game.MoveHandlers;
using TileGame.Business.Models;

namespace TileGame.Business.Game
{
    public class MoveHandlerFactory : IMoveHandlerFactory
    {
        public IMoveHandler CreateMoveHandler(Connection connection, User user, IGameHub gameHub)
        {
            IMoveHandler moveHandler;

            moveHandler = new SingleGameMoveHandler(connection, user, gameHub);

            return moveHandler;
        }
    }
}

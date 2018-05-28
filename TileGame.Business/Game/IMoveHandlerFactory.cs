using TileGame.Business.Models;

namespace TileGame.Business.Game
{
    public interface IMoveHandlerFactory
    {
        IMoveHandler CreateMoveHandler(Connection connection, User user, IGameHub gameHub);
    }
}

using TileGame.Business.Game.HubContext;
using TileGame.Business.Models;

namespace TileGame.Business.Game
{
    public interface IMoveHandlerFactory
    {
        IMoveHandler CreateMoveHandler(Connection connection, User user, IGameHubContext gameHubContext, IGameData gameData);
    }
}

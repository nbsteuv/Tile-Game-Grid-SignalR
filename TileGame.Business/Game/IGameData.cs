using TileGame.Business.Models;

namespace TileGame.Business.Game
{
    public interface IGameData
    {
        Connection MakeConnection(string username, string connectionId, string password);
    }
}

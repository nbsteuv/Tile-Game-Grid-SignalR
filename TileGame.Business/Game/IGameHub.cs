using TileGame.Business.Models;

namespace TileGame.Business.Game
{
    public interface IGameHub
    {
        void SendWinNotification(User user);
    }
}

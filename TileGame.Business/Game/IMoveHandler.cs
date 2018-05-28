using TileGame.Business.Models;

namespace TileGame.Business.Game
{
    public interface IMoveHandler
    {
        void HandleMove(Move move);
    }
}

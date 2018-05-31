using System.Collections.Generic;
using TileGame.Business.Models;
using static TileGame.Business.Enums;

namespace TileGame.Business.Game
{
    public interface IGameManager
    {
        void MakeConnection(string username, string connectionId, string password, GameType gameType, int wordLength);
        void Move(Move move, string username, string connectionId);
    }
}

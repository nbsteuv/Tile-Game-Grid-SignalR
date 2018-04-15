using System.Collections.Generic;
using TileGame.Business.Models;
using static TileGame.Business.Enums;

namespace TileGame.Business.Game
{
    public interface IGameData
    {
        Connection MakeConnection(string username, string connectionId, string password, GameType gameType);
        List<Word> GetWordList(int baseLength);
    }
}

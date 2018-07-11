using System.Collections.Generic;
using TileGame.Business.Models;
using static TileGame.Business.Enums;

namespace TileGame.Business.Game
{
    public interface IGameData
    {
        Connection MakeConnection(string username, string connectionId, string password, GameType gameType);
        List<Word> GetWordList(int baseLength);
        Connection AddGameToConnection(Connection connection, List<Word> wordList, char[] key);
        User GetUser(string connectionId, string username);
        Connection GetConnectionByPlayer(User user);
        List<Connection> GetAllConnectionsByPlayerConnectionId(string connectionId);
        void EndAllGamesByPlayerConnectionId(string connectionId);
        void EndGame(Connection connection);
    }
}

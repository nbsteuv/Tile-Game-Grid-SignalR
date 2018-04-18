using System.Collections.Generic;
using TileGame.Business.Models;
using static TileGame.Business.Enums;

namespace TileGame.Business.Game
{
    public interface IGameManager
    {
        Connection MakeConnection(string username, string connectionId, string password, GameType gameType);
        ConnectionStatus GetConnectionStatus (string connectionId, Connection connection);
        void CreateGame(Connection connection, int wordLength);
        List<User> GetConnectionUsers(Connection connection);
    }
}

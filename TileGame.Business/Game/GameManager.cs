using System.Linq;
using TileGame.Business.Models;

namespace TileGame.Business.Game
{
    public class GameManager : IGameManager
    {
        private readonly IGameData _gameData;

        public GameManager(IGameData gameData)
        {
            _gameData = gameData;
        }

        public Connection MakeConnection(string username, string connectionId, string password)
        {
            var connection = _gameData.MakeConnection(username, connectionId, password);

            return connection;
        }

        public Enums.ConnectionStatus GetConnectionStatus(string connectionId, Connection connection)
        {
            if(connection.Players.Count < 2)
            {
                return Enums.ConnectionStatus.Waiting;
            }

            if(connection.Players.Any(player => player.ConnectionId == connectionId))
            {
                return Enums.ConnectionStatus.Ready;
            }

            return Enums.ConnectionStatus.Watching;
        }
    }
}

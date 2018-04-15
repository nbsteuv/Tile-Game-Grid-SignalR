using System.Linq;
using TileGame.Business.Models;
using static TileGame.Business.Enums;

namespace TileGame.Business.Game
{
    public class GameManager : IGameManager
    {
        private readonly IGameData _gameData;

        public GameManager(IGameData gameData)
        {
            _gameData = gameData;
        }

        public Connection MakeConnection(string username, string connectionId, string password, GameType gameType)
        {
            var wordList = _gameData.GetWordList(5);

            var connection = _gameData.MakeConnection(username, connectionId, password, gameType);

            return connection;
        }

        public ConnectionStatus GetConnectionStatus(string connectionId, Connection connection)
        {
            if(connection.Players.Count < 2 && connection.Multiplayer == true)
            {
                return ConnectionStatus.Waiting;
            }

            if(connection.Players.Any(player => player.ConnectionId == connectionId))
            {
                return ConnectionStatus.Ready;
            }

            return ConnectionStatus.Watching;
        }
    }
}

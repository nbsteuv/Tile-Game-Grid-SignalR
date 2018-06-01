using System.Collections.Generic;
using System.Threading.Tasks;
using TileGame.Business.Models;
using static TileGame.Business.Enums;

namespace TileGame.Business.Game.HubContext
{
    public interface IGameHubContext
    {
        Task SendStatus(string connectionId, ConnectionStatus status);
        Task SendStartGame(string connectionId, char[] puzzle, IEnumerable<string> wordList);
        Task SendWinNotification(string connectionId);
    }
}

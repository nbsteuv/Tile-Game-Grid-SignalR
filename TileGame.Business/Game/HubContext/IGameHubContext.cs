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
        Task SendPlayerMove(string connectionId, List<int> moveHistory);
        Task SendWinConfirmedNotification(string connectionId);
        Task SendPlayerWinNotification(string connectionId, string username);
    }
}

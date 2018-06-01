using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TileGame.Business.Models;
using static TileGame.Business.Enums;

namespace TileGame.Business.Game.HubContext
{
    public class GameHubContext : IGameHubContext
    {
        private readonly IHubContext<GameHub> _gameHubContext;

        public GameHubContext(IHubContext<GameHub> gameHubContext)
        {
            _gameHubContext = gameHubContext;
        }

        public async Task SendStatus(string connectionId, ConnectionStatus status)
        {
            await _gameHubContext.Clients.Client(connectionId).SendAsync("SetStatus", status);
        }

        public async Task SendStartGame(string connectionId, char[] puzzle, IEnumerable<string> wordList)
        {
            await _gameHubContext.Clients.Client(connectionId).SendAsync("StartGame", puzzle, wordList);
        }

        public async Task SendWinNotification(User user)
        {
            throw new NotImplementedException();
        }
    }
}

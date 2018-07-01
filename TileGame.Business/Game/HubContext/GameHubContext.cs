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

        public async Task SendStartGame(string connectionId, GameSetup gameSetup)
        {
            await _gameHubContext.Clients.Client(connectionId).SendAsync("StartGame", gameSetup);
        }

        public async Task SendPlayerMove(string connectionId, List<int> moveHistory)
        {
            await _gameHubContext.Clients.Client(connectionId).SendAsync("PlayerMove", moveHistory);
        }

        public async Task SendWinConfirmedNotification(string connectionId)
        {
            await _gameHubContext.Clients.Client(connectionId).SendAsync("WinConfirmed");
        }

        public async Task SendPlayerWinNotification(string connectionId, string username)
        {
            await _gameHubContext.Clients.Client(connectionId).SendAsync("PlayerWin", username);
        }
    }
}

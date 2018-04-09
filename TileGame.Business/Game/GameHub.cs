using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace TileGame.Business.Game
{
    public class GameHub : Hub
    {
        private readonly IGameManager _gameManager;

        public GameHub(IGameManager gameManager)
        {
            _gameManager = gameManager;
        }

        [Authorize]
        public override async Task OnConnectedAsync()
        {
            _gameManager.TestBinding();

            await Clients.All.SendAsync("SendAction", Context.User.Identity.Name, "joined");
        }

        public override async Task OnDisconnectedAsync(Exception ex)
        {
            await Clients.All.SendAsync("SendAction", Context.User.Identity.Name, "left");
        }

        public async Task Send(string message)
        {
            await Clients.All.SendAsync("SendMessage", Context.User.Identity.Name, message);
        }
    }
}

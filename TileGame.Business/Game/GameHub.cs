using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TileGame.Business.Models;

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
            await Clients.Client(Context.ConnectionId).SendAsync("SetStatus", Enums.ConnectionStatus.Waiting);
        }

        public override async Task OnDisconnectedAsync(Exception ex)
        {
            await Clients.All.SendAsync("SendAction", Context.User.Identity.Name, "left");
        }

        public async Task Send(string message)
        {
            await Clients.All.SendAsync("SendMessage", Context.User.Identity.Name, message);
        }

        public void MakeConnection(string password)
        {
            var connection = _gameManager.MakeConnection(Context.User.Identity.Name, Context.ConnectionId, password);

            var users = new List<User>();

            connection.Players.ForEach(player => users.Add(player));

            connection.Watchers.ForEach(watcher => users.Add(watcher));

            users.AsParallel().ForAll(async username =>
            {
                var status = _gameManager.GetConnectionStatus(Context.ConnectionId, connection);

                await Clients.Client(Context.ConnectionId).SendAsync("SetStatus", status);
            });
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TileGame.Business.Models;
using static TileGame.Business.Enums;

namespace TileGame.Business.Game
{
    public class GameHub : Hub, IGameHub
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

        //TODO: GameHub should handle passing messages only -- any logic should be in GameManager

        public void MakeConnection(string password, GameType gameType, int wordLength)
        {
            var connection = _gameManager.MakeConnection(Context.User.Identity.Name, Context.ConnectionId, password, gameType);

            var users = _gameManager.GetConnectionUsers(connection);

            users.AsParallel().ForAll(async user =>
            {
                var status = _gameManager.GetConnectionStatus(user.ConnectionId, connection);

                await Clients.Client(user.ConnectionId).SendAsync("SetStatus", status);
            });

            TryStartGame(connection, wordLength);
        }

        private void TryStartGame(Connection connection, int wordLength)
        {
            if (!connection.Players.Any())
            {
                return;
            }

            if (_gameManager.GetConnectionStatus(connection.Players.FirstOrDefault().ConnectionId, connection) != ConnectionStatus.Ready)
            {
                return;
            }

            _gameManager.CreateGame(connection, wordLength);

            var users = _gameManager.GetConnectionUsers(connection);

            users.AsParallel().ForAll(async user =>
            {
                await Clients.Client(user.ConnectionId).SendAsync("StartGame", user.Puzzle, connection.WordList.Select<Word, string>(word => word.Text));
            });
        }

        public void Move(Move move)
        {
            _gameManager.Move(move, Context.User.Identity.Name, Context.ConnectionId);
        }

        public void SendWinNotification(User user)
        {
            throw new NotImplementedException();
        }
    }
}

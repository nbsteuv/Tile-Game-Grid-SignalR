using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TileGame.Business.Models;
using static TileGame.Business.Enums;
using MediatR;
using TileGame.Business.Models.Requests;

namespace TileGame.Business.Game
{
    public class GameHub : Hub, IGameHub
    {
        IMediator _mediator;

        public GameHub(IMediator mediator)
        {
            _mediator = mediator;
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

        public void MakeConnection(string password, GameType gameType, int wordLength)
        {
            _mediator.Send(new MakeConnectionRequest
            {
                GameType = gameType,
                Username = Context.User.Identity.Name,
                ConnectionId = Context.ConnectionId,
                Password = password,
                WordLength = wordLength
            });

            //TryStartGame(connection, wordLength);

            var x = 17;
        }

        public void Move(Move move)
        {
            //_gameManager.Move(move, Context.User.Identity.Name, Context.ConnectionId);
        }

        public async Task SendStatus(string connectionId, ConnectionStatus status)
        {
            await Clients.Client(connectionId).SendAsync("SetStatus", status);
        }

        public async Task SendStartGame(string connectionId, char[] puzzle, IEnumerable<string> wordList)
        {
            await Clients.Client(connectionId).SendAsync("SetStatus", puzzle, wordList);
        }

        public async Task SendWinNotification(User user)
        {
            throw new NotImplementedException();
        }
    }
}

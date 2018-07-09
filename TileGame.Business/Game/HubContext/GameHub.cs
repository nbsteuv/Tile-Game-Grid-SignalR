using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;
using TileGame.Business.Models;
using TileGame.Business.Models.Requests;
using static TileGame.Business.Enums;

namespace TileGame.Business.Game.HubContext
{
    public class GameHub : Hub
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

        public override Task OnDisconnectedAsync(Exception ex)
        {
            _mediator.Send(new DisconnectRequest
            {
                ConnectionId = Context.ConnectionId
            });

            return Task.CompletedTask;
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
        }

        public void Move(Move move)
        {
            _mediator.Send(new MoveRequest
            {
                Username = Context.User.Identity.Name,
                ConnectionId = Context.ConnectionId,
                Move = move
            });
        }
    }
}

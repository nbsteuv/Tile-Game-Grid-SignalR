using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Serilog;
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
            try
            {
                await Clients.Client(Context.ConnectionId).SendAsync("SetStatus", Enums.ConnectionStatus.Waiting);
            }
            catch(Exception e)
            {
                Log.Error(e, e.Message);
            }
        }

        public override async Task OnDisconnectedAsync(Exception ex)
        {
            try
            {
                await _mediator.Send(new DisconnectRequest
                {
                    ConnectionId = Context.ConnectionId
                });
            }
            catch (Exception e)
            {
                Log.Error(e, e.Message);
            }
        }

        public async Task Send(string message)
        {
            try
            {
                await Clients.All.SendAsync("SendMessage", Context.User.Identity.Name, message);
            }
            catch (Exception e)
            {
                Log.Error(e, e.Message);
            }
        }

        public void MakeConnection(string password, GameType gameType, int wordLength)
        {
            try
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
            catch (Exception e)
            {
                Log.Error(e, e.Message);
            }
        }

        public void Move(Move move)
        {
            try
            {
                _mediator.Send(new MoveRequest
                {
                    Username = Context.User.Identity.Name,
                    ConnectionId = Context.ConnectionId,
                    Move = move
                });
            }
            catch (Exception e)
            {
                Log.Error(e, e.Message);
            }
        }
    }
}

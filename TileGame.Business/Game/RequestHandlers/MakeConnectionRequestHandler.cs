using MediatR;
using Serilog;
using System;
using TileGame.Business.Models.Requests;

namespace TileGame.Business.Game.RequestHandlers
{
    public class MakeConnectionRequestHandler : RequestHandler<MakeConnectionRequest>
    {
        private readonly IGameManager _gameManager;

        public MakeConnectionRequestHandler(IGameManager gameManager)
        {
            _gameManager = gameManager;
        }

        protected override void HandleCore(MakeConnectionRequest request)
        {
            try
            {
                _gameManager.MakeConnectionAsync(request.Username, request.ConnectionId, request.Password, request.GameType, request.WordLength);
            }
            catch (Exception e)
            {
                Log.Error(e, e.Message);
            }
        }
    }
}

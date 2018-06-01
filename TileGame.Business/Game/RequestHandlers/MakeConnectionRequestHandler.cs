using MediatR;
using TileGame.Business.Models.Requests;

namespace TileGame.Business.Game.RequestHandlers
{
    public class MakeConnectionRequestHandler : RequestHandler<MakeConnectionRequest>
    {
        IGameManager _gameManager;

        public MakeConnectionRequestHandler(IGameManager gameManager)
        {
            _gameManager = gameManager;
        }

        protected override void HandleCore(MakeConnectionRequest request)
        {
            _gameManager.MakeConnectionAsync(request.Username, request.ConnectionId, request.Password, request.GameType, request.WordLength);
        }
    }
}

using MediatR;
using TileGame.Business.Models.Requests;

namespace TileGame.Business.Game.RequestHandlers
{
    public class MoveRequestHandler : RequestHandler<MoveRequest>
    {
        private readonly IGameManager _gameManager;

        public MoveRequestHandler(IGameManager gameManager)
        {
            _gameManager = gameManager;
        }

        protected override void HandleCore(MoveRequest request)
        {
            _gameManager.Move(request.Username, request.ConnectionId, request.Move);
        }
    }
}

using MediatR;
using static TileGame.Business.Enums;

namespace TileGame.Business.Models.Requests
{
    public class MakeConnectionRequest :IRequest
    {
        public GameType GameType;
        public string Username;
        public string ConnectionId;
        public string Password;
        public int WordLength;
    }
}

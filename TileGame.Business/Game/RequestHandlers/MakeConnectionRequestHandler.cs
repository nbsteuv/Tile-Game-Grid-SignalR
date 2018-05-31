using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TileGame.Business.Models.Requests;

namespace TileGame.Business.Game.RequestHandlers
{
    public class MakeConnectionRequestHandler : RequestHandler<MakeConnectionRequest>
    {
        protected override void HandleCore(MakeConnectionRequest request)
        {
            throw new NotImplementedException();
        }
    }
}

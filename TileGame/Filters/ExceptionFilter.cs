using Microsoft.AspNetCore.Mvc.Filters;
using Serilog;
using System.Threading.Tasks;

namespace TileGame.Filters
{
    public class ExceptionFilter : ExceptionFilterAttribute
    {
        public override Task OnExceptionAsync(ExceptionContext context)
        {
            Log.Error(context.Exception, context.Exception.Message);
            return Task.CompletedTask;
        }
    }
}

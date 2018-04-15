using Autofac;
using System.Reflection;
using TileGame.Business.Data;
using TileGame.Business.Game;
using TileGame.Data;
using AutofacModule = Autofac.Module;

namespace TileGame
{
    public class AutofacBindings : AutofacModule
    {
        protected override void Load(ContainerBuilder builder)
        {
            var assemblies = new Assembly[]
            {
                Assembly.GetAssembly(typeof(Business.Map))
            };

            builder.RegisterAssemblyTypes(assemblies)
                .InstancePerLifetimeScope()
                .AsImplementedInterfaces();

            builder.RegisterType<ApplicationDbContext>().As<IApplicationDbContext>()
                .InstancePerLifetimeScope();

            builder.RegisterType<GameData>().As<IGameData>()
                .SingleInstance();
        }
    }
}

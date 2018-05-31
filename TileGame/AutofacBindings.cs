using Autofac;
using System.Reflection;
using TileGame.Business.Data;
using TileGame.Business.Game;
using TileGame.Data;
using AutofacModule = Autofac.Module;
using MediatR;
using System.Collections.Generic;

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

            builder.RegisterType<Mediator>().As<IMediator>()
                .InstancePerLifetimeScope();

            builder.Register<SingleInstanceFactory>(ctx =>
            {
                var c = ctx.Resolve<IComponentContext>();
                return t => c.TryResolve(t, out var o) ? o : null;
            }).InstancePerLifetimeScope();

            builder.Register<MultiInstanceFactory>(ctx =>
            {
                var c = ctx.Resolve<IComponentContext>();
                return t => (IEnumerable<object>)c.Resolve(typeof(IEnumerable<>).MakeGenericType(t));
            }).InstancePerLifetimeScope();
        }
    }
}

using Autofac;
using System.Reflection;
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
        }
    }
}

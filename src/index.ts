import { ResolverFn, resolver } from "graphql-sequelize";
import { Model } from 'sequelize/types';

type Context = {};

function wrapResolver<TResult, TParent = {}, TContext extends Context = Context, TArgs = {}>(
  resolverFunction: ResolverFn<TResult, TParent, TContext, TArgs>,
) {
  const wrappedResolver: ResolverFn<TResult, TParent, TContext, TArgs> = (
    root,
    args,
    input,
    ...rest
  ) => {
    return resolverFunction(root, args, input, ...rest);
  };
  return wrappedResolver;
}

class AModel extends Model{}

// compiler crashes here
wrapResolver( resolver(AModel) || [])


import { FindOptions, BelongsTo, Association, ModelCtor, Model } from 'sequelize';
import { GraphQLResolveInfo } from 'graphql';

export interface ResolverOptions<TModel = any, TArgs = any, TContext = any> {
    /**
     * Whether or not this should return a list. Defaults to whether or not the
     * field type is an instance of `GraphQLList`.
     * */
    list?: boolean;

    /**  Whether or not relay connections should be handled. Defaults to `true`. */
    handleConnection?: boolean;

    before?(
      /** Options sent to Sequelize model's find function */
      findOptions: FindOptions,
      /** The arguments from the incoming GraphQL query */
      args: TArgs,
      /** Resolver context */
      context: TContext,
    ): FindOptions | Promise<FindOptions>;

    /** Manipulate the Sequelize find results before it's sent back to the requester. */
    after?(result: TModel, args: TArgs, context: TContext): TModel;

    /*
     * Transfer fields from the graphql context to the options passed to model calls
     * Inherits from global resolver.contextToOptions
     */
    contextToOptions?: Record<string, string>;
  }

  export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
  ) => Promise<TResult>;

  /**
   * The resolver function takes a model as its first (required) argument,
   * but also has a second options object argument.
   */
  declare function resolver<M extends Model, TParent = {}, TContext = {}, TArgs = {}>(
    modelOrAssociation: ModelCtor<M> | Association<any, M>,
    option?: ResolverOptions<M, TArgs, TContext>,
  ): ResolverFn<ModelCtor<M>, TParent, TContext, TArgs>;

 

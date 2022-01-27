import { graphql, subscribe, parse } from 'graphql';
import { schema } from '../schema/schema.graphql';

// beforeAll(connectMongoose);
// beforeEach(clearDbAndRestartCounters);
// afterAll(disconnectMongoose);

describe('UserAdded Subscription', () => {
  it('should complete a user subscription after UserAddMutation', async () => {
    const mutation = `
      mutation M($input: UserAddInput!) {
        UserAdd(input: $input) {
          token
          error
        }
      }
    `;

    const subscription = `
      subscription S($input: UserAddedInput!) {
        UserAdded(input: $input) {
          user {
            name
            username
            email
            isActive
            followers {
              totalCount
            }
            following {
              totalCount
            }
          }
        }
      }
    `;

    const rootValue = {};
    const contextValue = await getContext({});
    const variablesMutation = {
      input: {
        name: 'Awesome Name',
        username: 'awesomeusername',
        email: 'awesome@email.com',
        password: '12345',
      },
    };
    const variablesSubscription = {
      input: {},
    };

    const triggerSubscription = graphql(
      schema,
      mutation,
      rootValue,
      contextValue,
      variablesMutation,
    );
    const result = await subscribe(
      schema,
      parse(subscription),
      triggerSubscription,
      contextValue,
      variablesSubscription,
    );

    expect((await result.next()).value.data).toEqual({
      UserAdded: {
        user: {
          name: 'Awesome Name',
          username: 'awesomeusername',
          email: null,
          isActive: true,
          followers: {
            totalCount: 0,
          },
          following: {
            totalCount: 0,
          },
        },
      },
    });
  });
});

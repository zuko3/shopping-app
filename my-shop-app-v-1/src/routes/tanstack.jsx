import { useState } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import {
  queryOptions,
  useSuspenseQuery,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import {
  fetchPostsListTanstackFn,
  fetchPostByIdTanstackFn,
} from "@/apis/postAPI";

//https://tanstack.com/router/v1/docs/integrations/query
//https://tanstack.com/router/latest/docs/api/router/redirectFunction#redirect-options

const postsQueryOptions = queryOptions({
  queryKey: ["posts"],
  queryFn: fetchPostsListTanstackFn,
});

const getPostsByIdQueryOptions = (id) =>
  queryOptions({
    queryKey: ["posts", id],
    queryFn: () => fetchPostByIdTanstackFn(id),
  });

// eslint-disable-next-line react-refresh/only-export-components
function PostPreview({ postId }) {
  const queryClient = useQueryClient();
  const cachedPost = queryClient.getQueryData(["posts", postId]);

  const { data: post, isLoading } = useQuery({
    ...getPostsByIdQueryOptions(postId),
    enabled: !!postId,
  });

  if (isLoading) {
    return (
      <div className="w-3/4 border-l border-gray-200 pl-6">
        <p>Loading ...</p>
      </div>
    );
  }

  return (
    <div className="w-3/4 border-l border-gray-200 pl-6">
      {postId ? (
        <>
          <div className="mb-4">
            {cachedPost && (
              <span className="py-2 px-4 rounded-2xl bg-green-100 text-green-700">
                Cache
              </span>
            )}
          </div>
          <h2 className="font-semibold mb-2">#{post.id}</h2>
          <h2 className="font-semibold mb-2">{post.title}</h2>
          <p>{post.body}</p>
        </>
      ) : (
        <p>Select a post</p>
      )}
    </div>
  );
}

export const Route = createFileRoute("/tanstack")({
  beforeLoad: ({ context }) => {
    const state = context.store.getState();
    if (!state.auth.loggedIn) {
      throw redirect({ to: "/auth/login" });
    }
  },
  loader: async ({ context }) => {
    context.queryClient.ensureQueryData(postsQueryOptions);
  },
  component: function Index() {
    const { data } = useSuspenseQuery(postsQueryOptions);
    const [postId, setPostId] = useState("");

    return (
      <div className="flex gap-6">
        {/* List */}
        <div className="w-1/4">
          <div>Hello "/tanstack"!</div>

          <ul className="mt-4">
            {data.map((post) => (
              <li
                key={post.id}
                onClick={() => setPostId(post.id)}
                className="cursor-pointer border-t p-2 hover:bg-gray-100"
              >
                <p># Post {post.id}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Detail View */}
        <PostPreview postId={postId} />
      </div>
    );
  },
});

// With useSuspenseQuery():
// invalidateQueries()
//       ↓
// query refetches
//       ↓
// component rerenders automatically ✅

//------>>>

// With useLoaderData():
// invalidateQueries()
//       ↓
// query cache updates
//       ↓
// loader data stays the same ❌
// useLoaderData() doesn't subscribe to the query cache.

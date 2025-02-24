import { UseMutationResult } from "@tanstack/react-query";

import { PostInterface } from "../../interfaces/post";

export interface PostDetailsProps {
  post: PostInterface;
  deleteMutation: UseMutationResult<any, Error, number, unknown>;
}

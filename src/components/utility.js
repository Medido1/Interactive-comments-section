function getNextId(data) { /* get the id of the new comment */
  if (!data.comments || data.comments.length === 0) return 1;
  let lastId = - Infinity;
  
  function traverseComments(comments) {
    for (let comment of comments) {
      if (comment.id > lastId) {
        lastId = comment.id
      }
      if (comment.replies) {
        traverseComments(comment.replies)
      }
    }
  }

  traverseComments(data.comments)
  return lastId + 1;
}

export {getNextId}
const express = require("express");
const commentRouter = express.Router();
const Comment = require("../models/comment");
const Review = require("../models/review");

// ✅Get all comments
commentRouter.get("/", (req, res, next) => {
  Comment.find((err, comments) => {
    if (err) {
      return next(err);
    }

    res.status(200).json(comments);
  });
});

//✅Create a new comment on a political review (requires authentication)
commentRouter.post("/:reviewId", (req, res, next) => {
  req.body.review = req.params.reviewId;
  req.body.createdBy = req.auth._id;
  const newComment = new Comment(req.body);

  newComment.save((err, savedComment) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(savedComment);
  });
});

// Get comment/ reviewId
commentRouter.get("/:reviewId",async(req, res, next) => {
 try{ const reviewId = req.params.reviewId;
  const foundReview = await Review.findById({_id: reviewId})
  res.status(200).send(foundReview)
}
catch (err){
  console.log(err)
  res.status(500)
  res.json({message:"issue in get by one route review"})
}



  // const reviewId = req.auth._id;
  // req.body.review = req.params.reviewId;
  // req.body.createdBy = req.auth._id;
  // console.log("REQ", reviewId);
  // Promise.all([
  //   Review.findOne({ _id: reviewId }).exec(),
  //   Comment.find({ review: reviewId }).exec(),
  // ])
  //   .then(([foundReview, comments]) => {
  //     if (!foundReview) {
  //       res.status(404).json({ message: "review not found" });
  //     } else {
  //       res.status(200).json({ review: foundReview, comments: comments });
  //     }
  //   })
  //   .catch((err) => {
  //     next(err);
  //   });
});

commentRouter.put("/:commentId", (req, res, next) => {
  Comment.findOneAndUpdate(
    { _id: req.params.commentId, createdBy: req.auth._id },
    req.body,
    { new: true },
    (err, updatedComment) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(201).send(updatedComment);
    }
  );
  

})

//Deletes
commentRouter.delete("/:commentId", (req, res, next) => {
  const commentId = req.params.commentId;

  Comment.findById(commentId, (err, comment) => {
    if (err) {
      return next(err);
    }

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.createdBy.toString() !== req.auth._id) {
      return res.status(403).json({
        message: "Permission denied. You are not the owner of this comment.",
      });
    }

    Comment.findByIdAndRemove(commentId, (err) => {
      if (err) {
        return next(err);
      }
      res.status(204).send();
    });
  });
});

module.exports = commentRouter;

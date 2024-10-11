import { BiSolidUserCircle, BiStar } from "react-icons/bi";

function ReviewItem({ review }) {
  const reviewDate = new Date(review.created_at);
  const formattedReviewDate = `${
    reviewDate.getDate() > 9 ? reviewDate.getDate() : `0${reviewDate.getDate()}`
  }-${
    reviewDate.getMonth() > 9
      ? reviewDate.getMonth()
      : `0${reviewDate.getMonth()}`
  }-${reviewDate.getFullYear()} ${
    reviewDate.getHours() > 9
      ? reviewDate.getHours()
      : `0${reviewDate.getHours()}`
  }:${
    reviewDate.getMinutes() > 9
      ? reviewDate.getMinutes()
      : `0${reviewDate.getMinutes()}`
  }`;

  return (
    <div className="flex flex-col gap-6 p-3 border border-highlights rounded-lg my-8 w-full sm:flex-row sm:w-4/5 sm:p-4">
      <div>
        <BiSolidUserCircle className="text-5xl text-highlights" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-4 items-start sm:flex-row sm:items-end">
          <p className="text-highlights text-xl font-semibold">
            {review.author}
          </p>
          <p>{formattedReviewDate}</p>
        </div>
        <div>
          <div className="flex gap-1 items-center text-yellow-500 text-xl">
            <BiStar />
            <p>{review.author_details.rating}</p>
          </div>
          <p className="py-4 text-base sm:text-lg">{review.content}</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewItem;

import { type FC } from "react";

const EmptyState: FC = () => {
  return (
    <div className="news-list__empty">
      <h2 className="news-list__empty__title">No results</h2>
    </div>
  );
};

export default EmptyState;

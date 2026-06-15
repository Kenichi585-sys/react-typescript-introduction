import type { FilterKey, SortKey, SortOrder, Tab } from "../types";

const TAB_ITEMS = [
  { value: "all", label: "全員" },
  { value: "student", label: "生徒のみ" },
  { value: "mentor", label: "メンターのみ" },
] as const satisfies readonly { value: Tab; label: string }[];

const SORT_ITEMS = [
  { tab: "student", value: "studyMinutes", label: "勉強時間" },
  { tab: "student", value: "score", label: "ハピネススコア" },
  { tab: "mentor", value: "experienceDays", label: "実務経験月数" },
] as const satisfies readonly {
  tab: Exclude<Tab, "all">;
  value: SortKey;
  label: string;
}[];

const FILTER_ITEMS: {
  value: FilterKey;
  label: string;
  showFor: Tab[];
}[] = [
  { value: "hobbies", label: "趣味", showFor: ["all", "student", "mentor"] },
  { value: "studyLangs", label: "勉強中の言語", showFor: ["student"] },
  { value: "useLangs", label: "現場で使っている言語", showFor: ["mentor"] },
];

type Props = {
  tab: Tab;
  sortKey: SortKey | null;
  sortOrder: SortOrder;
  filterKey: FilterKey | null;
  filterWord: string;
  onTabChange: (tab: Tab) => void;
  onSortKeyChange: (sortKey: SortKey) => void;
  onToggleSortOrder: () => void;
  onFilterKeySelect: (filterKey: FilterKey) => void;
  onFilterWordChange: (word: string) => void;
  onClearFilter: () => void;
  onOpenForm: () => void;
};

export const Toolbar = ({
  tab,
  sortKey,
  sortOrder,
  filterKey,
  filterWord,
  onTabChange,
  onSortKeyChange,
  onToggleSortOrder,
  onFilterKeySelect,
  onFilterWordChange,
  onClearFilter,
  onOpenForm,
}: Props) => {
  return (
    <div className="toolbar">
      <div className="toolbar-row">
        <span className="toolbar-label">表示</span>
        <div className="toolbar-actions">
          {TAB_ITEMS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              className={`btn ${tab === value ? "btn-active" : ""}`}
              onClick={() => onTabChange(value)}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            className="btn btn-primary"
            onClick={onOpenForm}
          >
            新規作成
          </button>
        </div>
      </div>
      {(tab === "student" || tab === "mentor") && (
        <div className="toolbar-row">
          <span className="toolbar-label">並び替え</span>
          <div className="toolbar-actions">
            {SORT_ITEMS.filter((item) => item.tab === tab).map(
              ({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  className={`btn ${sortKey === value ? "btn-active" : ""}`}
                  onClick={() => onSortKeyChange(value)}
                >
                  {label}
                </button>
              ),
            )}
            {sortKey !== null && (
              <button type="button" className="btn" onClick={onToggleSortOrder}>
                {sortOrder === "asc" ? "降順" : "昇順"}
              </button>
            )}
          </div>
        </div>
      )}
      <div className="toolbar-row">
        <span className="toolbar-label">絞り込み</span>
        <div className="toolbar-actions">
          {FILTER_ITEMS.filter((item) => item.showFor.includes(tab)).map(
            ({ value, label }) => (
              <button
                key={value}
                type="button"
                className={`btn ${filterKey === value ? "btn-active" : ""}`}
                onClick={() => onFilterKeySelect(value)}
              >
                {label}
              </button>
            ),
          )}
          {filterKey !== null && (
            <>
              <input
                type="text"
                className="filter-input"
                placeholder="キーワードを入力"
                value={filterWord}
                onChange={(e) => onFilterWordChange(e.target.value)}
              />
              <button type="button" className="btn" onClick={onClearFilter}>
                解除
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

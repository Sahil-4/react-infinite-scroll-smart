const Item = ({ item }: { item: DataT }) => {
  return (
    <div className="data-item">
      <p>{item.title}</p>
      <p>{item.price}</p>
    </div>
  );
};

export default Item;

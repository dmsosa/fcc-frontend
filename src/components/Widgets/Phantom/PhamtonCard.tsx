export default function PhantomCard() {
  return (
    <div className="card rounded">
      <div className="d-flex justify-content-between align-items-start gap-2">
        <div className="avatar phantom"></div>
        <div className="phantom phantom-text phantom-w50 rounded"></div>
      </div>
      <div>
        <div className="phantom phantom-text phantom-w80 mx-auto rounded"></div>
        <div className="phantom phantom-text phantom-w80 mx-auto rounded"></div>
        <div className="phantom phantom-text phantom-w80 mx-auto rounded"></div>
        <div className="phantom phantom-text phantom-w80 mx-auto rounded"></div>
      </div>
    </div>
  );
}
function Footer({ data }) {
  const year = new Date().getFullYear();

  return (
    <div className="flex items-center justify-center py-3">
      {!data?.footer ? (
        <p>
          {year}{" "}
          <a
            href="https://3xg.africa"
            className="font-weight-bold"
            target="_blank"
            rel="noreferrer"
          >
            Powered By
          </a>{" "}
          3XG Africa
        </p>
      ) : (
        <span
          dangerouslySetInnerHTML={{
            __html: data.footer,
          }}
        ></span>
      )}
    </div>
  );
}

export default Footer;

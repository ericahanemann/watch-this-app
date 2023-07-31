function Footer() {

  return (
    <div className="mt-12 pb-5 flex justify-center">
      <div className="border-t border-solid border-secondary pt-3 w-11/12 text-center gap-5 text-sm text-secondary">
        <p>
          &copy; {new Date().getFullYear()} Érica Vanessa Hanemann. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;

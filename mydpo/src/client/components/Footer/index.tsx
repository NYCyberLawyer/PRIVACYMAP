import Link from "next/link";

export default function Footer() {
  return (
    <p>
      © {new Date().getFullYear()}
      {" · "}
      <Link href="https://www.privateers.io/privacy-policy/">Privacy policy</Link>
      {" · "}
      <Link href="https://www.privateers.io/tou/">Terms of Service</Link>
    </p>
  );
}

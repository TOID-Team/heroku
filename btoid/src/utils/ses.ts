export async function simpleEmailService(email: string): Promise<string> {
  const otp = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0');

  console.log({
    email,
    otp,
  });

  return otp;
}

import { useState, createRef } from "react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";

function Home() {
  const [method, setMethod] = useState<string>("encrypt");

  const toggleMethod = (to: string) => {
    setMethod(to);
  };

  const key = createRef<HTMLInputElement>();
  const decrypted = createRef<HTMLTextAreaElement>();
  const encrypted = createRef<HTMLTextAreaElement>();

  const convert = () => {
    if (!key.current || !decrypted.current || !encrypted.current) return;

    const keyArray = key.current?.value.split("");
    let keyIndex: number = 0;
    const currentKeyLetter = () => (keyArray ? keyArray[keyIndex] : null);

    const decryptedArray =
      method === "encrypt"
        ? decrypted.current.value.split("")
        : encrypted.current.value.split("");

    const encryptedArray: number[] = decryptedArray.map((char) => {
      const increment = currentKeyLetter()?.charCodeAt(0) || 0;

      if (keyIndex === keyArray.length - 1) {
        keyIndex = 0;
      } else {
        keyIndex++;
      }

      return method === "encrypt"
        ? char.charCodeAt(0) + increment
        : char.charCodeAt(0) - increment;
    });

    method === "encrypt"
      ? (encrypted.current.value = String.fromCharCode(...encryptedArray))
      : (decrypted.current.value = String.fromCharCode(...encryptedArray));
  };

  const copyText = (text: string, e: any) => {
    const target = e.target as HTMLElement;
    const button = target.closest("button");

    button?.classList.add("copied");

    setTimeout(() => {
      button?.classList.remove("copied");
    }, 1000);

    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <header className="sticky top-0 w-full flex justify-end">
        <Button
          onClick={() => {
            document.documentElement.classList.toggle("dark");
          }}
          variant="outline"
          size="icon"
          className="absolute top-2 right-2 p-1 w-7 h-7"
        >
          <svg
            className="w-3/4 h-3/4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"
            ></path>
          </svg>
        </Button>
      </header>

      <main className="pt-20 pb-10 w-11/12 max-w-5xl flex flex-col gap-4">
        <div className="mb-10 w-full flex flex-col sm:items-center">
          <h1 className="text-3xl font-bold">Cryptography</h1>
          <h2 className="text-muted-foreground">
            Perform encryption and decryption on a message using a specific key.
          </h2>
        </div>

        <form
          action=""
          className="w-full flex flex-col items-end gap-10"
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="w-full flex flex-wrap items-center justify-center gap-10">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="inline-flex items-start gap-1" htmlFor="key">
                Key
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <svg
                        className="w-2.5 h-2.5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                        <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"></path>
                      </svg>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">
                        The key can be anything, a password, a passphrase...
                        <br /> Any string with no restriction if not your own
                        mind.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                type="text"
                id="key"
                placeholder="3ncrypt"
                required={true}
                ref={key}
              />
              {/* <h6 className="text-xs text-muted-foreground">
                If you have included the key, be sure you have removed it :
                "key&"
              </h6> */}
            </div>

            {/* <div className="w-full flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="includeKey" />
                <label
                  htmlFor="includeKey"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Include the key
                </label>
              </div>
            </div> */}
          </div>

          <div className="w-full flex flex-wrap justify-center gap-6">
            <div className="min-w-[15rem] flex flex-1 flex-col gap-1.5">
              <Label htmlFor="decrypted">Decrypted</Label>
              <div className="relative">
                <Button
                  type="button"
                  onClick={(e) => {
                    if (!decrypted.current) return;

                    copyText(decrypted.current.value, e);
                  }}
                  variant="ghost"
                  size="icon"
                  className="group absolute top-2 right-2 w-5 h-5 p-1 items-center justify-center bg-background"
                >
                  <svg
                    className="group-[.copied]:hidden"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    className="hidden group-[.copied]:block"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Button>
                <Textarea
                  placeholder="Type your message here."
                  id="decrypted"
                  ref={decrypted}
                />
              </div>
            </div>

            <div className="min-w-[15rem] flex flex-1 flex-col gap-1.5">
              <Label htmlFor="decrypted">Encrypted</Label>
              <div className="relative">
                <Button
                  type="button"
                  onClick={(e) => {
                    if (!encrypted.current) return;

                    copyText(encrypted.current.value, e);
                  }}
                  variant="ghost"
                  size="icon"
                  className="group absolute top-2 right-2 w-5 h-5 p-1 items-center justify-center bg-background"
                >
                  <svg
                    className="group-[.copied]:hidden"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    className="hidden group-[.copied]:block"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Button>
                <Textarea
                  placeholder="Type your encrypted message here."
                  id="encrypted"
                  ref={encrypted}
                />
              </div>
            </div>
          </div>

          <div className="inline-flex gap-1">
            <Button
              onClick={() => {
                toggleMethod("decrypt");
              }}
              type="submit"
              variant="outline"
              size="sm"
              className="w-fit"
            >
              Decrypt
            </Button>
            <Button
              onClick={() => {
                toggleMethod("encrypt");
              }}
              type="submit"
              size="sm"
              className="w-fit"
            >
              Encrypt
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}

export default Home;

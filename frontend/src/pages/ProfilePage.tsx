import { Input } from "@/components/ui/input";
import useMe from "@/hooks/useMe";
import useUpdateProfile from "@/hooks/useUpdateProfile";
import { Label } from "@radix-ui/react-label";

const ProfilePage = () => {
  const { data: user } = useMe();
  const { mutate } = useUpdateProfile();

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  return (
    <div className="flex flex-col gap-8 md:grid md:grid-cols-2 mx-4 my-6 md:m-20">
      {/* Profile Picture Section */}
      <div className="flex flex-col items-center md:items-start gap-4">
        <p className="font-semibold self-start md:self-auto">Profile Picture</p>

        <img
          className="w-32 h-32 rounded-full border-2 border-black/50"
          src={
            user?.profilePic ??
            "https://api.dicebear.com/7.x/bottts/svg?seed=WindTalk"
          }
        />

        <div className="grid w-full md:max-w-sm items-center gap-3">
          <Label htmlFor="picture" className="text-sm ml-1">
            Change Profile Picture
          </Label>
          <Input
            id="picture"
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const base64 = await fileToBase64(file);
              mutate(base64);
            }}
          />
        </div>
      </div>

      {/* Profile Information Section */}
      <div className="w-full flex flex-col items-center md:items-start gap-6">
        <p className="font-semibold self-start md:self-auto">
          Profile Information
        </p>

        <div className="grid w-full md:max-w-sm items-center gap-3">
          <Label htmlFor="fullname" className="ml-1 text-sm">
            Full name
          </Label>
          <Input
            disabled
            type="text"
            id="fullname"
            value={user?.fullName ?? "Full name"}
          />
        </div>

        <div className="grid w-full md:max-w-sm items-center gap-3">
          <Label htmlFor="email" className="ml-1 text-sm">
            Email
          </Label>
          <Input
            disabled
            type="email"
            id="email"
            value={user?.email ?? "email"}
          />
        </div>

        <p className="font-semibold self-start md:self-auto">
          Account Information
        </p>

        <div className="grid w-full md:max-w-sm items-center gap-3">
          <Label htmlFor="memberSince" className="ml-1 text-sm">
            Member since
          </Label>
          <Input
            disabled
            type="text"
            id="memberSince"
            value={new Date(user?.createdAt ?? "").toLocaleString()}
          />
        </div>

        <div className="grid w-full md:max-w-sm items-center gap-3">
          <Label htmlFor="status" className="ml-1 text-sm">
            Account status
          </Label>
          <Input
            disabled
            type="text"
            id="status"
            value={"Active"}
            className="bg-green-200 text-center md:text-left"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

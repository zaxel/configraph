"use client";

import {
  Mail,
  Shield,
  User2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { AvatarUploadButton } from "./AvatarUploadButton";
import Image from "next/image";
import { useProfile } from "@/features/account/hooks/useProfile";
import { useUpdateProfile } from "@/features/account/hooks/useUpdateProfile";
import { useEntitlements } from "@/features/billing/context/entitlements.context";
import { PLANS } from "@/features/billing/config/plans";
import Link from "next/link";

type ProfileForm = {
  email: string;
  username: string;
  avatar_url: string;
}

const EMPTY_FORM: ProfileForm = {
  username: "",
  email: "",
  avatar_url: "",
};

export default function ProfilePage() {
  const { user } = useUser();
  const {
    data: profile,
    isLoading,
  } = useProfile();
  const updateProfile = useUpdateProfile();

  const [form, setForm] = useState<ProfileForm>(EMPTY_FORM);
  const [initialForm, setInitialForm] = useState<ProfileForm>(EMPTY_FORM);
  const initializedRef = useRef(false);

  const { plan, usage, limits } = useEntitlements();
  const Icon = PLANS[plan].icon;

  useEffect(() => {
    if (!profile || initializedRef.current) return;

    const init = async () => {
      initializedRef.current = true;

      const next: ProfileForm = {
        username: profile.username ?? "",
        email: profile.email ?? "",
        avatar_url: profile.avatar_url ?? user?.imageUrl ?? "",
      };

      setForm(next);
      setInitialForm(next);
    };

    init();
  }, [profile?.id]);


  const handleSave = async () => {
    if (!user?.id) return;

    await updateProfile.mutateAsync({
      clerkUserId: user.id,
      values: form,
    });

    setInitialForm({ ...form });
  };

  const isDirty = JSON.stringify(form) !== JSON.stringify(initialForm);
  const displayAvatar = form.avatar_url || user?.imageUrl;

  if (isLoading) return <div className="w-full h-[80vh] flex justify-center items-center text-gray-400">Loading...</div>;

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Profile
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage your account information and workspace
            preferences.
          </p>
        </div>

        <Button onClick={handleSave} className="rounded-2xl cursor-pointer" disabled={!isDirty || updateProfile.isPending}>
          {updateProfile.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </section>

      {/* PROFILE */}
      <section className="grid gap-6 xl:grid-cols-[380px_1fr]">
        {/* LEFT */}
        <div className="space-y-6">
          {/* USER CARD */}
          <div className="rounded-3xl border bg-background p-6">
            <div className="flex flex-col items-center text-center">
              {/* AVATAR */}
              <div className="relative mb-5">
                <div className="flex h-28 w-28 items-center justify-center rounded-3xl border bg-muted/30 text-3xl font-semibold overflow-hidden">
                  {displayAvatar ? (
                    <Image
                      width={112}
                      height={112}
                      loading={"eager"}
                      src={displayAvatar}
                      alt={`${form.username || "User"}'s avatar`}
                      className="h-full w-full object-cover select-none"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : form?.username?.trim() ? (
                    form.username
                      .trim()
                      .split(/\s+/)
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)
                  ) : (
                    <span className="text-muted-foreground/60">??</span>
                  )}
                </div>


                < AvatarUploadButton
                  userId={user?.id ?? null}
                  onUploadSuccess={(url) => setForm(prev => ({ ...prev, avatar_url: url }))}
                />
              </div>

              {/* USER INFO */}
              <h2 className="text-2xl font-semibold">
                {form?.username}
              </h2>

              <p className="mt-1 text-muted-foreground">
                {form?.email}
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Icon className="h-4 w-4" />
                <span className="first-letter:uppercase">
                  {plan} Plan
                </span>
              </div>
            </div>

            <Separator className="my-6" />

            {/* USAGE */}
            <div className="space-y-5">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Configurators
                  </span>

                  <span className="text-sm text-muted-foreground">
                    {usage.configuratorsCount} / {limits.configurators ?? "∞"}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary"
                    style={{
                      width: limits.configurators === null ? "5%" : `${usage.configuratorsCount / (limits.configurators) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Storage
                  </span>

                  <span className="text-sm text-muted-foreground">
                    {usage.storageUsedMb}MB / {plan === "business" ? "∞" : limits.uploadMb * (limits.configurators ?? 1)}MB
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary"
                    style={{
                      width: plan === "business" ? "5%" : `${(usage.storageUsedMb / (limits.uploadMb * (limits.configurators ?? 1)) * 100)}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECURITY */}
          <div className="rounded-3xl border bg-background p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl border bg-muted/30 p-3">
                <Shield className="h-5 w-5" />
              </div>

              <div>
                <h3 className="font-semibold">
                  Security
                </h3>

                <p className="text-sm text-muted-foreground">
                  Account protection and authentication.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start rounded-2xl"
              >
                Change Password
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start rounded-2xl"
              >
                Manage Sessions
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start rounded-2xl"
              >
                Two-Factor Authentication
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* ACCOUNT DETAILS */}
          <div className="rounded-3xl border bg-background p-6">
            <div className="mb-8">
              <h2 className="text-xl font-semibold">
                Account Details
              </h2>

              <p className="mt-2 text-muted-foreground">
                Update your personal information and
                display preferences.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* DISPLAY NAME */}
              <div className="space-y-2">
                <Label htmlFor="displayName">
                  Display Name
                </Label>

                <div className="relative">
                  <User2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="displayName"
                    value={form.username}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, username: e.target.value }))
                    }
                    className="h-12 rounded-2xl pl-10"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address
                </Label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    className="h-12 rounded-2xl pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* PLAN */}
          <div className="rounded-3xl border bg-background p-6">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Current Plan
                </h2>

                <p className="mt-2 text-muted-foreground">
                  Your active subscription and available
                  features.
                </p>
              </div>

              <Link href="/dashboard/billing#plans">
                <Button className="rounded-2xl cursor-pointer">
                  Upgrade Plan
                </Button>
              </Link>
            </div>

            <div className="rounded-3xl border bg-muted/20 p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Active Subscription
                  </p>

                  <h3 className="first-letter:uppercase mt-2 text-3xl font-semibold tracking-tight">
                    {plan} Plan
                  </h3>
                </div>

                <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Active
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border bg-background p-4">
                  <p className="text-sm text-muted-foreground">
                    Configurator Limit
                  </p>

                  <h4 className="mt-2 text-2xl font-semibold">
                    {limits.configurators ?? "∞"}
                  </h4>
                </div>

                <div className="rounded-2xl border bg-background p-4">
                  <p className="text-sm text-muted-foreground">
                    Upload Limit
                  </p>

                  <h4 className="mt-2 text-2xl font-semibold">
                    {plan === "business" ? "∞" : limits.uploadMb * (limits.configurators ?? 1)}MB
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
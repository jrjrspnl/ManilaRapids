import { Link, useLocalSearchParams } from "expo-router";
import {
  AlertCircle,
  ArrowLeft,
  Baby,
  CheckCircle,
  Clock,
  Download,
  Eye,
  FileText,
  Heart,
  Landmark,
  Package,
  Settings,
  XCircle,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Mock data for document requests
const documentData = {
  request: [
    {
      id: "1",
      documentType: "Birth Certificate",
      requestNumber: "REQ-2024-001",
      dateSubmitted: "2024-01-15",
      estimatedCompletion: "2024-01-22",
      status: "pending",
      priority: "Standard",
      department: "Vital Records",
      requiredAction: "Verification",
    },
    {
      id: "2",
      documentType: "Academic Transcript",
      requestNumber: "REQ-2024-002",
      dateSubmitted: "2024-01-14",
      estimatedCompletion: "2024-01-21",
      status: "pending",
      priority: "Urgent",
      department: "Registrar Office",
      requiredAction: "Payment Confirmation",
    },
  ],
  toProcess: [
    {
      id: "3",
      documentType: "Business Permit",
      requestNumber: "REQ-2024-003",
      dateSubmitted: "2024-01-13",
      estimatedCompletion: "2024-01-20",
      status: "in review",
      priority: "Standard",
      department: "Business Services",
      requiredAction: "Additional Documentation",
      assignedTo: "Officer Smith",
    },
  ],
  toReceive: [
    {
      id: "4",
      documentType: "Tax Certificate",
      requestNumber: "REQ-2024-004",
      dateSubmitted: "2024-01-12",
      estimatedCompletion: "2024-01-25",
      status: "processing",
      priority: "Express",
      department: "Immigration Services",
      requiredAction: "Photo Approval",
      currentStage: "Background Check",
    },
  ],
  completed: [
    {
      id: "5",
      documentType: "Marriage Certificate",
      requestNumber: "REQ-2024-005",
      dateSubmitted: "2024-01-10",
      dateCompleted: "2024-01-17",
      status: "completed",
      priority: "Standard",
      department: "Vital Records",
      downloadUrl: "#",
      completionNotes: "Document ready for download",
    },
    {
      id: "6",
      documentType: "Building Permit",
      requestNumber: "REQ-2024-006",
      dateSubmitted: "2024-01-08",
      dateCompleted: "2024-01-15",
      status: "completed",
      priority: "Urgent",
      department: "Land Registry",
      downloadUrl: "#",
      completionNotes: "Certified copy issued",
    },
  ],
  cancelled: [
    {
      id: "7",
      documentType: "Tax Certificate",
      requestNumber: "REQ-2024-007",
      dateSubmitted: "2024-01-05",
      dateCancelled: "2024-01-07",
      status: "cancelled",
      priority: "Standard",
      department: "DMV",
      cancellationReason: "Incomplete application",
    },
  ],
};

const tabs = [
  { key: "request", label: "Request", icon: Clock, count: 2 },
  { key: "toProcess", label: "To Process", icon: Settings, count: 1 },
  { key: "toReceive", label: "To Receive", icon: Package, count: 1 },
  { key: "completed", label: "Completed", icon: CheckCircle, count: 2 },
  { key: "cancelled", label: "Cancelled", icon: XCircle, count: 1 },
];

const History = () => {
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState(
    (params.tab as string) || "request"
  );

  // Function to get the appropriate icon for each document type
  const getDocumentIcon = (documentType: string) => {
    switch (documentType) {
      case "Birth Certificate":
        return Baby;
      case "Marriage Certificate":
        return Heart;
      case "Tax Certificate":
        return Landmark;
      case "Business Permit":
      case "Building Permit":
      case "Academic Transcript":
      case "Driver License":
      case "Property Deed":
      case "Passport Renewal":
        return FileText;
      default:
        return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning/20 text-warning border-warning/30";
      case "in review":
        return "bg-secondary/20 text-secondary border-secondary/30";
      case "processing":
        return "bg-tertiary/20 text-tertiary border-tertiary/30";
      case "completed":
        return "bg-success/20 text-success border-success/30";
      case "cancelled":
        return "bg-error/20 text-error border-error/30";
      default:
        return "bg-neutral-500/20 text-neutral-500 border-neutral-500/30";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-error/10 text-error border-error/20";
      case "Express":
        return "bg-warning/10 text-warning border-warning/20";
      case "Standard":
        return "bg-neutral-500/10 text-neutral-500 border-neutral-500/20";
      default:
        return "bg-neutral-500/10 text-neutral-500 border-neutral-500/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return Clock;
      case "in review":
        return Eye;
      case "processing":
        return Settings;
      case "completed":
        return CheckCircle;
      case "cancelled":
        return XCircle;
      default:
        return FileText;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderDocumentItem = ({ item }: any) => {
    const StatusIcon = getStatusIcon(item.status);
    const DocumentIcon = getDocumentIcon(item.documentType);

    return (
      <View className="p-5 mb-4 bg-white border shadow-sm rounded-xl border-neutral-200">
        {/* Header */}
        <View className="flex-row items-start justify-between mb-4">
          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <View className="p-2 rounded-lg bg-primary/10">
                <DocumentIcon size={20} color="#1d3557" />
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-lg font-semibold text-neutral-800">
                  {item.documentType}
                </Text>
                <Text className="text-sm text-neutral-500">
                  {item.requestNumber}
                </Text>
              </View>
            </View>
          </View>
          <View
            className={`px-3 py-1 rounded-full border ${getStatusColor(
              item.status
            )}`}
          >
            <Text className="text-xs font-medium capitalize">
              {item.status}
            </Text>
          </View>
        </View>

        <View className="mb-4 space-y-3">
          <View className="flex-row justify-between">
            <Text className="text-sm text-neutral-600">Department:</Text>
            <Text className="text-sm font-medium text-neutral-800">
              {item.department}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-sm text-neutral-600">Submitted:</Text>
            <Text className="text-sm font-medium text-neutral-800">
              {formatDate(item.dateSubmitted)}
            </Text>
          </View>

          {item.estimatedCompletion && (
            <View className="flex-row justify-between">
              <Text className="text-sm text-neutral-600">Est. Completion:</Text>
              <Text className="text-sm font-medium text-tertiary">
                {formatDate(item.estimatedCompletion)}
              </Text>
            </View>
          )}

          {item.dateCompleted && (
            <View className="flex-row justify-between">
              <Text className="text-sm text-neutral-600">Completed:</Text>
              <Text className="text-sm font-medium text-success">
                {formatDate(item.dateCompleted)}
              </Text>
            </View>
          )}
        </View>

        <View className="flex-row items-center justify-between pt-3 border-t border-neutral-100">
          <View
            className={`px-2 py-1 rounded-md border ${getPriorityColor(
              item.priority
            )}`}
          >
            <Text className="text-xs font-medium">{item.priority}</Text>
          </View>

          <View className="flex-row items-center space-x-3">
            {item.status === "completed" && (
              <TouchableOpacity className="flex-row items-center px-3 py-2 rounded-lg bg-primary/10">
                <Download size={16} color="#1d3557" />
                <Text className="ml-1 text-sm font-medium text-primary">
                  Download
                </Text>
              </TouchableOpacity>
            )}

            {item.requiredAction && (
              <View className="flex-row items-center">
                <AlertCircle size={14} color="#ff9800" />
                <Text className="ml-1 text-xs text-warning">
                  {item.requiredAction}
                </Text>
              </View>
            )}
          </View>
        </View>

        {(item.assignedTo || item.currentStage || item.completionNotes) && (
          <View className="pt-3 mt-3 border-t border-neutral-100">
            {item.assignedTo && (
              <Text className="text-xs text-neutral-600">
                Assigned to:{" "}
                <Text className="font-medium">{item.assignedTo}</Text>
              </Text>
            )}
            {item.currentStage && (
              <Text className="text-xs text-neutral-600">
                Current Stage:{" "}
                <Text className="font-medium">{item.currentStage}</Text>
              </Text>
            )}
            {item.completionNotes && (
              <Text className="text-xs text-success">
                {item.completionNotes}
              </Text>
            )}
            {item.cancellationReason && (
              <Text className="text-xs text-error">
                Reason: {item.cancellationReason}
              </Text>
            )}
          </View>
        )}
      </View>
    );
  };

  const renderEmptyState = () => (
    <View className="items-center justify-center flex-1 px-8 py-16">
      <View className="p-6 mb-5 bg-neutral-50 rounded-2xl">
        <FileText size={56} color="#6c757d" />
      </View>
      <Text className="mb-2 text-xl font-semibold text-center text-neutral-600">
        No Document Requests
      </Text>
      <Text className="text-base leading-6 text-center text-neutral-500">
        There are no document requests in this category at the moment.
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-neutral-50">
      <View className="flex-row items-center px-6 py-5 bg-white">
        <Link href="/(tabs)/profile" asChild>
          <TouchableOpacity className="p-2">
            <ArrowLeft size={24} color="#1d3557" />
          </TouchableOpacity>
        </Link>
        <Text className="flex-1 text-xl font-bold text-center text-primary">
          Document Requests History
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View className="bg-white border-b border-accent-100">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            gap: 8,
          }}
        >
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.key;

            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                activeOpacity={1}
                className={`flex-row items-center px-4 py-3 rounded-xl border-2 ${
                  isActive
                    ? "bg-primary border-primary"
                    : "bg-white border-neutral-200"
                }`}
              >
                <TabIcon size={18} color={isActive ? "white" : "#6c757d"} />
                <Text
                  className={`ml-2 font-semibold ${
                    isActive ? "text-white" : "text-neutral-600"
                  }`}
                >
                  {tab.label}
                </Text>
                {tab.count > 0 && (
                  <View
                    className={`ml-2 px-2 py-1 rounded-full ${
                      isActive ? "bg-white/20" : "bg-primary/10"
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        isActive ? "text-white" : "text-primary"
                      }`}
                    >
                      {tab.count}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View className="flex-1 px-5 pt-5">
        <FlatList
          data={documentData[activeTab as keyof typeof documentData]}
          renderItem={renderDocumentItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 20,
          }}
        />
      </View>
    </View>
  );
};

export default History;

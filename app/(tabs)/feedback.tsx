import {
  AlertTriangle,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  FileText,
  HeartHandshake,
  Minus,
  PhilippinePeso,
  PieChart,
  ScrollText,
  ShieldCheck,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  XCircle
} from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import CustomModal from "../components/Modal";

interface DocumentMetric {
  name: string;
  processingTime: string;
  status: "efficient" | "moderate" | "inefficient";
  complianceScore: number;
  redTapeIndex: number;
  lastUpdated: string;
  requirements: number;
  averageResolution: string;
  trend: "up" | "down" | "stable";
  efficiency: number;
  satisfaction: number;
  requestsThisMonth: number;
}

interface CategoryMetrics {
  [key: string]: {
    title: string;
    icon: React.ReactNode;
    documents: DocumentMetric[];
    overallScore: number;
    trend: "improving" | "stable" | "declining";
    totalDocuments: number;
    avgProcessingTime: string;
    totalRequests: number;
  };
}

const Feedback = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const openCategoryDetails = (category: string) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  const categoryMetrics: CategoryMetrics = {
    civil: {
      title: "Civil Registry Documents",
      icon: <ScrollText size={22} color="#1d3557" />,
      overallScore: 85,
      trend: "improving",
      totalDocuments: 2,
      avgProcessingTime: "2.5 days",
      totalRequests: 1247,
      documents: [
        {
          name: "Birth Certificate",
          processingTime: "2-3 days",
          status: "efficient",
          complianceScore: 90,
          redTapeIndex: 2,
          lastUpdated: "2024-01-15",
          requirements: 3,
          averageResolution: "24h",
          trend: "up",
          efficiency: 92,
          satisfaction: 88,
          requestsThisMonth: 845,
        },
        {
          name: "Marriage Certificate",
          processingTime: "3-5 days",
          status: "moderate",
          complianceScore: 75,
          redTapeIndex: 4,
          lastUpdated: "2024-01-14",
          requirements: 5,
          averageResolution: "48h",
          trend: "stable",
          efficiency: 78,
          satisfaction: 72,
          requestsThisMonth: 402,
        },
      ],
    },
    services: {
      title: "Community and Social Services",
      icon: <HeartHandshake size={22} color="#1d3557" />,
      overallScore: 78,
      trend: "stable",
      totalDocuments: 1,
      avgProcessingTime: "6 days",
      totalRequests: 892,
      documents: [
        {
          name: "Social Welfare Assistance",
          processingTime: "5-7 days",
          status: "moderate",
          complianceScore: 78,
          redTapeIndex: 5,
          lastUpdated: "2024-01-13",
          requirements: 7,
          averageResolution: "72h",
          trend: "up",
          efficiency: 76,
          satisfaction: 80,
          requestsThisMonth: 892,
        },
      ],
    },
    clearance: {
      title: "Clearance and Permits",
      icon: <ShieldCheck size={22} color="#1d3557" />,
      overallScore: 65,
      trend: "declining",
      totalDocuments: 2,
      avgProcessingTime: "4.5 days",
      totalRequests: 1563,
      documents: [
        {
          name: "Business Permit",
          processingTime: "7-10 days",
          status: "inefficient",
          complianceScore: 60,
          redTapeIndex: 7,
          lastUpdated: "2024-01-12",
          requirements: 8,
          averageResolution: "120h",
          trend: "down",
          efficiency: 58,
          satisfaction: 62,
          requestsThisMonth: 678,
        },
        {
          name: "Barangay Clearance",
          processingTime: "1-2 days",
          status: "efficient",
          complianceScore: 88,
          redTapeIndex: 3,
          lastUpdated: "2024-01-15",
          requirements: 2,
          averageResolution: "18h",
          trend: "up",
          efficiency: 90,
          satisfaction: 85,
          requestsThisMonth: 885,
        },
      ],
    },
    tax: {
      title: "Tax and Financial Documents",
      icon: <PhilippinePeso size={22} color="#1d3557" />,
      overallScore: 72,
      trend: "improving",
      totalDocuments: 1,
      avgProcessingTime: "5 days",
      totalRequests: 734,
      documents: [
        {
          name: "Tax Clearance",
          processingTime: "4-6 days",
          status: "moderate",
          complianceScore: 72,
          redTapeIndex: 6,
          lastUpdated: "2024-01-14",
          requirements: 6,
          averageResolution: "96h",
          trend: "up",
          efficiency: 70,
          satisfaction: 74,
          requestsThisMonth: 734,
        },
      ],
    },
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "efficient":
        return <CheckCircle size={18} color="#4caf50" />;
      case "moderate":
        return <AlertTriangle size={18} color="#ff9800" />;
      case "inefficient":
        return <XCircle size={18} color="#e63946" />;
      default:
        return <AlertTriangle size={18} color="#6c757d" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "efficient":
        return "bg-success";
      case "moderate":
        return "bg-warning";
      case "inefficient":
        return "bg-error";
      default:
        return "bg-neutral-500";
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "efficient":
        return "text-success";
      case "moderate":
        return "text-warning";
      case "inefficient":
        return "text-error";
      default:
        return "text-neutral-500";
    }
  };

  const getTrendIcon = (trend: string, size: number = 16) => {
    switch (trend) {
      case "improving":
      case "up":
        return <TrendingUp size={size} color="#4caf50" />;
      case "declining":
      case "down":
        return <TrendingDown size={size} color="#e63946" />;
      default:
        return <Minus size={size} color="#6c757d" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-error";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-warning";
    return "bg-error";
  };

  const renderCircularProgress = (score: number, size: number = 60, stroke: number = 6) => {
    return (
      <View className="relative items-center justify-center">
        <View style={{ width: size, height: size }}>
          <View
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: '#f8f9fa',
              position: 'absolute',
            }}
          />
          <View
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: stroke,
              borderColor: score >= 80 ? '#4caf50' : score >= 60 ? '#ff9800' : '#e63946',
              borderLeftColor: 'transparent',
              borderBottomColor: 'transparent',
              transform: [{ rotate: '45deg' }],
              position: 'absolute',
            }}
          />
        </View>
        <View className="absolute">
          <Text className={`text-sm font-bold ${getScoreColor(score)}`}>
            {score}%
          </Text>
        </View>
      </View>
    );
  };

  const renderCategoryCard = (categoryKey: string, metrics: typeof categoryMetrics.civil) => (
    <TouchableOpacity
      key={categoryKey}
      onPress={() => openCategoryDetails(categoryKey)}
      className="mb-4 bg-white rounded-xl p-4 border border-accent-100 shadow-sm"
    >
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <View className="flex-row items-center mb-2">
            <View className="w-10 h-10 rounded-lg bg-accent-100 items-center justify-center mr-3">
              {metrics.icon}
            </View>
            <View className="flex-1">
              <Text className="text-primary text-lg font-semibold">{metrics.title}</Text>
              <Text className="text-neutral-500 text-sm">
                {metrics.totalDocuments} documents • {metrics.totalRequests.toLocaleString()} requests
              </Text>
            </View>
          </View>
        </View>
        {renderCircularProgress(metrics.overallScore, 50, 6)}
      </View>

      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          {getTrendIcon(metrics.trend, 16)}
          <Text className="text-neutral-500 text-sm ml-1 capitalize">
            {metrics.trend}
          </Text>
        </View>
        <View className="flex-row items-center space-x-2">
          <View className="flex-row items-center">
            <Clock size={14} color="#6c757d" />
            <Text className="text-neutral-500 text-sm ml-1">{metrics.avgProcessingTime}</Text>
          </View>
          <View className="flex-row space-x-1">
            {metrics.documents.map((doc, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full ${getStatusColor(doc.status)}`}
              />
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderDocumentCard = (document: DocumentMetric) => (
    <View key={document.name} className="mb-4 bg-white rounded-lg p-4 border border-accent-100">
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Text className="text-primary text-base font-semibold mb-1">{document.name}</Text>
          <View className="flex-row items-center">
            {getStatusIcon(document.status)}
            <Text className={`text-sm font-medium ml-2 ${getStatusTextColor(document.status)}`}>
              {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center">
          {getTrendIcon(document.trend)}
        </View>
      </View>

      <View className="space-y-3">
        <View className="flex-row justify-between">
          <View className="items-center flex-1">
            <Text className="text-xs text-neutral-500 mb-1">Compliance</Text>
            <Text className={`text-sm font-bold ${getScoreColor(document.complianceScore)}`}>
              {document.complianceScore}%
            </Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-xs text-neutral-500 mb-1">Efficiency</Text>
            <Text className="text-sm font-bold text-primary">{document.efficiency}%</Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-xs text-neutral-500 mb-1">Satisfaction</Text>
            <Text className="text-sm font-bold text-secondary">{document.satisfaction}%</Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-xs text-neutral-500 mb-1">Requests</Text>
            <Text className="text-sm font-bold text-primary">{document.requestsThisMonth}</Text>
          </View>
        </View>

        <View>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-xs text-neutral-500">Processing Time</Text>
            <Text className="text-sm font-medium text-primary">{document.processingTime}</Text>
          </View>
          <View className="w-full bg-neutral-50 rounded-full h-1.5">
            <View 
              className={`h-1.5 rounded-full ${getScoreBgColor(100 - document.redTapeIndex * 10)}`}
              style={{ width: `${100 - (document.redTapeIndex * 10)}%` }}
            />
          </View>
        </View>

        <View className="flex-row justify-between pt-2 border-t border-accent-100">
          <View className="flex-row items-center">
            <FileText size={12} color="#6c757d" />
            <Text className="text-xs text-neutral-500 ml-1">{document.requirements} requirements</Text>
          </View>
          <View className="flex-row items-center">
            <Target size={12} color="#6c757d" />
            <Text className="text-xs text-neutral-500 ml-1">Red Tape: {document.redTapeIndex}/10</Text>
          </View>
          <View className="flex-row items-center">
            <Clock size={12} color="#6c757d" />
            <Text className="text-xs text-neutral-500 ml-1">{document.averageResolution}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-neutral-50">
      <View className="bg-white pt-12 pb-4 px-5">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-2xl font-bold text-primary">Anti-Red Tape Compliance</Text>
            <Text className="text-neutral-500">Monitoring and Evaluation Dashboard</Text>
          </View>
          <TouchableOpacity className="bg-secondary rounded-lg p-2">
            <PieChart size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        className="flex-1"
        contentContainerStyle={{ padding: 20 }}
      >
        <View className="bg-white rounded-xl p-5 mb-6 border border-accent-100 shadow-sm">
          <Text className="text-primary text-lg font-semibold mb-4">Performance Overview</Text>
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-3xl font-bold text-primary mb-1">78%</Text>
              <Text className="text-neutral-500">Overall Compliance Rate</Text>
            </View>
            <View className="items-end">
              <View className="flex-row items-center mb-1">
                <TrendingUp size={18} color="#4caf50" />
                <Text className="text-success font-semibold ml-1">+2.4%</Text>
              </View>
              <Text className="text-neutral-500 text-sm">This month</Text>
            </View>
          </View>
          
          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <View className="w-12 h-12 bg-accent-100 rounded-lg items-center justify-center mb-1">
                <FileText size={20} color="#1d3557" />
              </View>
              <Text className="text-primary font-bold">6</Text>
              <Text className="text-neutral-500 text-xs">Documents</Text>
            </View>
            <View className="items-center flex-1">
              <View className="w-12 h-12 bg-accent-100 rounded-lg items-center justify-center mb-1">
                <Users size={20} color="#1d3557" />
              </View>
              <Text className="text-primary font-bold">4,436</Text>
              <Text className="text-neutral-500 text-xs">Total Requests</Text>
            </View>
            <View className="items-center flex-1">
              <View className="w-12 h-12 bg-accent-100 rounded-lg items-center justify-center mb-1">
                <CheckCircle size={20} color="#1d3557" />
              </View>
              <Text className="text-primary font-bold">84%</Text>
              <Text className="text-neutral-500 text-xs">Satisfaction</Text>
            </View>
            <View className="items-center flex-1">
              <View className="w-12 h-12 bg-accent-100 rounded-lg items-center justify-center mb-1">
                <Clock size={20} color="#1d3557" />
              </View>
              <Text className="text-primary font-bold">4.5d</Text>
              <Text className="text-neutral-500 text-xs">Avg. Time</Text>
            </View>
          </View>
        </View>

        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-primary text-xl font-semibold">Document Categories</Text>
          </View>
          {Object.entries(categoryMetrics).map(([key, metrics]) => 
            renderCategoryCard(key, metrics)
          )}
        </View>

        <View className="bg-white rounded-xl p-5 border border-accent-100 shadow-sm mb-6">
          <Text className="text-primary text-lg font-semibold mb-4">Management Tools</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity className="items-center flex-1">
              <View className="w-14 h-14 bg-accent-100 rounded-xl items-center justify-center mb-2">
                <Download size={22} color="#1d3557" />
              </View>
              <Text className="text-primary text-sm font-medium">Export Report</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center flex-1">
              <View className="w-14 h-14 bg-accent-100 rounded-xl items-center justify-center mb-2">
                <Calendar size={22} color="#1d3557" />
              </View>
              <Text className="text-primary text-sm font-medium">Schedule Audit</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center flex-1">
              <View className="w-14 h-14 bg-accent-100 rounded-xl items-center justify-center mb-2">
                <BarChart3 size={22} color="#1d3557" />
              </View>
              <Text className="text-primary text-sm font-medium">Analytics</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {selectedCategory && (
        <CustomModal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          title={categoryMetrics[selectedCategory].title}
          size="large"
        >
          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            <View className="bg-primary rounded-lg p-5 mb-4">
              <View className="flex-row justify-between items-center mb-3">
                <View>
                  <Text className="text-white text-lg font-semibold mb-1">Overall Compliance</Text>
                  <Text className="text-3xl font-bold text-white">
                    {categoryMetrics[selectedCategory].overallScore}%
                  </Text>
                </View>
                {renderCircularProgress(categoryMetrics[selectedCategory].overallScore, 70, 8)}
              </View>
              <View className="flex-row justify-between">
                <View className="flex-row items-center">
                  {getTrendIcon(categoryMetrics[selectedCategory].trend, 18)}
                  <Text className="text-accent-100 font-medium ml-2 capitalize">
                    {categoryMetrics[selectedCategory].trend} trend
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Users size={16} color="#a8dadc" />
                  <Text className="text-accent-100 text-sm ml-1">
                    {categoryMetrics[selectedCategory].totalRequests.toLocaleString()} requests
                  </Text>
                </View>
              </View>
            </View>

            <Text className="text-primary text-lg font-semibold mb-3">Document Performance</Text>
            {categoryMetrics[selectedCategory].documents.map(renderDocumentCard)}
          </ScrollView>
        </CustomModal>
      )}
    </View>
  );
};

export default Feedback;